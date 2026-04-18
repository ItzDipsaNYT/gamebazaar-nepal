module {
  public type UserId = Text; // email address as user identifier
  public type Timestamp = Int; // nanoseconds since epoch (Time.now())
  public type OrderId = Text; // unique order identifier e.g. "GB-1234567890"
  public type SessionToken = Text; // opaque session token

  public type Result<T> = { #ok : T; #err : Text };
};
