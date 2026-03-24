import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  type Booking = {
    client : Text;
    phone : Text;
    date : Text;
    package : Text;
  };

  module Booking {
    public func compare(booking1 : Booking, booking2 : Booking) : Order.Order {
      switch (Text.compare(booking1.date, booking2.date)) {
        case (#equal) { Text.compare(booking1.client, booking2.client) };
        case (order) { order };
      };
    };

    public func compareByClient(booking1 : Booking, booking2 : Booking) : Order.Order {
      Text.compare(booking1.client, booking2.client);
    };
  };

  let bookings = Map.empty<Text, Booking>();
  var nextId = 0;

  func generateId() : Text {
    let newId = nextId.toText();
    nextId += 1;
    newId;
  };

  public shared ({ caller }) func submitBooking(booking : Booking) : async Text {
    let newBooking = {
      booking with
      client = booking.client.trim(#char ' ');
      phone = booking.phone.trim(#char ' ');
      date = booking.date.trim(#char ' ');
      package = booking.package.trim(#char ' ');
    };

    if (newBooking.client.size() == 0 or newBooking.phone.size() == 0 or newBooking.date.size() == 0 or newBooking.package.size() == 0) {
      Runtime.trap("All fields must be filled out");
    };

    let id = generateId();
    bookings.add(id, newBooking);
    id;
  };

  public query ({ caller }) func getBookingKeys() : async [Text] {
    bookings.keys().toArray();
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.values().toArray().sort();
  };
};
