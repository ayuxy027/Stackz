
import "./message.tact";
import "@stdlib/ownable";
import "@stdlib/deploy";

const minTonsForStorage: Int = ton("0.01");
const gasConsumption: Int = ton("0.02");

contract SIPManager with OwnableTransferable, Deployable {
    owner: Address;
    sip_registry: map<Int, Address>;

    init(owner_address: Address) {
        self.owner = owner_address;
        self.sip_registry = {};
    }

    receive(msg: DeploySIP) {
        self.requireOwner();
        let ctx: Context = context();
        let msgValue: Int = ctx.value;

        let sipId: Int = msg.sipId;
        let sipInit: StateInit = initOf SIPContract(msg.sipId, self.owner);

        send(SendParameters {
            to: contractAddress(sipInit),
            value: msgValue - gasConsumption,
            bounce: false,
            mode: SendIgnoreErrors,
            body: InitializeSIP {sipId: msg.sipId}.toCell(),
            code: sipInit.code,
            data: sipInit.data
        });

        self.sip_registry[sipId] = contractAddress(sipInit);
    }

    get fun get_sip_address(sipId: Int): Address? {
        return self.sip_registry[sipId];
    }
}

contract SIPContract {
    sipId: Int;
    owner: Address;
    user_deposits: map<Address, Int>;

    init(sipId: Int, owner_address: Address) {
        self.sipId = sipId;
        self.owner = owner_address;
        self.user_deposits = {};
    }

    receive(msg: DepositFunds) {
        let ctx: Context = context();
        let msgValue: Int = ctx.value;
        let sender: Address = ctx.sender;

        self.user_deposits[sender] = self.user_deposits.get(sender, 0) + msgValue;

        emit(LogDeposit {user: sender, amount: msgValue, total: self.user_deposits[sender]}.toCell());
    }

    receive(msg: GetUserInvestment) {
        let ctx: Context = context();
        let sender: Address = ctx.sender;

        let totalDeposited: Int = self.user_deposits.get(sender, 0);

        send(SendParameters {
            to: sender,
            value: 0,
            mode: 64,
            body: ReportInvestment {
                query_id: msg.query_id,
                total_invested: totalDeposited
            }.toCell()
        });
    }

    get fun get_total_investment(user: Address): Int {
        return self.user_deposits.get(user, 0);
    }

    get fun get_sip_id(): Int {
        return self.sipId;
    }
}
