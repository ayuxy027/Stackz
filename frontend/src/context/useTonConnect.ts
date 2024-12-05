import { useTonConnectUI } from '@tonconnect/ui-react';

export function useTonConnect(): { connected: boolean; } {

   const [tonConnectUI] = useTonConnectUI();

   return {
      connected: tonConnectUI.connected,
   };
}