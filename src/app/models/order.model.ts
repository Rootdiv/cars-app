export interface IOrder {
  car?: string | null;
  name?: string | null;
  phone?: string | null;
}

export interface IResponseSendOrder {
  success: number;
  message: string;
  error: {
    message: string;
  };
}
