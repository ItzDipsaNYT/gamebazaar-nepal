import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;
  public type SessionToken = Common.SessionToken;

  public type UserRole = { #user; #staff };

  public type User = {
    email : Text;
    var passwordHash : Text;
    var role : UserRole;
    createdAt : Timestamp;
  };

  public type Session = {
    token : SessionToken;
    email : Text;
    role : UserRole;
    createdAt : Timestamp;
  };

  // Shared (public API) types — no var fields
  public type UserInfo = {
    email : Text;
    role : UserRole;
    createdAt : Timestamp;
  };

  public type LoginResult = Common.Result<{ token : SessionToken; user : UserInfo }>;
};
