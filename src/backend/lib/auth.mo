import Types "../types/auth";
import List "mo:core/List";
import Map "mo:core/Map";
import Int "mo:core/Int";

module {
  // Staff code stored ONLY here in the backend — never exposed to callers or frontend
  let STAFF_CODE : Text = "BAAZARSTAFF10";

  // Simple deterministic hash using polynomial rolling hash over char codes
  public func hashPassword(password : Text) : Text {
    var hash : Nat = 5381;
    for (c in password.toIter()) {
      let code = Nat32.toNat(Char.toNat32(c));
      hash := (hash * 33 + code) % 4294967296;
    };
    hash.toText();
  };

  // Generate a session token from email + timestamp
  public func generateToken(email : Text, timestamp : Int) : Types.SessionToken {
    let ts = Int.abs(timestamp);
    "tok_" # email # "_" # ts.toText();
  };

  // Verify staff code — returns Bool, never exposes the actual code value
  public func verifyStaffCode(code : Text) : Bool {
    code == STAFF_CODE;
  };

  // Convert internal User to shared UserInfo
  public func toUserInfo(user : Types.User) : Types.UserInfo {
    { email = user.email; role = user.role; createdAt = user.createdAt };
  };

  // Find user by email
  public func findByEmail(users : List.List<Types.User>, email : Text) : ?Types.User {
    users.find(func(u) { u.email == email });
  };

  // Find session by token
  public func findSession(sessions : Map.Map<Types.SessionToken, Types.Session>, token : Types.SessionToken) : ?Types.Session {
    sessions.get(token);
  };
};
