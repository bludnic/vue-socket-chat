/**
 * Message type.
 */
enum Type {
  Message = 'message',
  Transaction = 'transaction',
  DateDivider = 'dateDivider'
}

/**
 * Crypto currency.
 */
enum Currency {
  ADM = 'ADM',
  ETH = 'ETH',
  BNB = 'BNB'
}

export interface User {
  id: string,
  name: string,
  pic: string
}

export interface Message {
  id: string,
  type: Type.Message,
  message: string,
  timestamp: number,
  sender: User
}

export interface Transaction {
  id: string,
  type: Type.Transaction,
  message: string,
  timestamp: number,
  sender: User,
  amount: number,
  currency: Currency
}

export interface DateDivider {
  type: Type.DateDivider,
  timestamp: number
}
