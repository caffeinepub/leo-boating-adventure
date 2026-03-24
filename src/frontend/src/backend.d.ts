import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    client: string;
    package: string;
    date: string;
    phone: string;
}
export interface backendInterface {
    getAllBookings(): Promise<Array<Booking>>;
    getBookingKeys(): Promise<Array<string>>;
    submitBooking(booking: Booking): Promise<string>;
}
