import Types "../types/auth";
import AuthLib "../lib/auth";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  users : List.List<Types.User>,
  sessions : Map.Map<Types.SessionToken, Types.Session>,
) {
  // Register a new user with email + password
  public func signUp(email : Text, password : Text) : async Types.LoginResult {
    switch (AuthLib.findByEmail(users, email)) {
      case (?_) { #err("Email already registered") };
      case null {
        let now = Time.now();
        let hash = AuthLib.hashPassword(password);
        let user : Types.User = {
          email;
          var passwordHash = hash;
          var role = #user;
          createdAt = now;
        };
        users.add(user);
        let token = AuthLib.generateToken(email, now);
        let session : Types.Session = { token; email; role = #user; createdAt = now };
        sessions.add(token, session);
        #ok({ token; user = AuthLib.toUserInfo(user) });
      };
    };
  };

  // Login an existing user, returns session token + info
  public func login(email : Text, password : Text) : async Types.LoginResult {
    switch (AuthLib.findByEmail(users, email)) {
      case null { #err("Invalid email or password") };
      case (?user) {
        let hash = AuthLib.hashPassword(password);
        if (user.passwordHash != hash) {
          #err("Invalid email or password")
        } else {
          let now = Time.now();
          let token = AuthLib.generateToken(email, now);
          let session : Types.Session = { token; email; role = user.role; createdAt = now };
          sessions.add(token, session);
          #ok({ token; user = AuthLib.toUserInfo(user) });
        };
      };
    };
  };

  // Staff login: email + secret staff code (code verified ONLY here, never in frontend)
  public func staffLogin(email : Text, staffCode : Text) : async Types.LoginResult {
    if (not AuthLib.verifyStaffCode(staffCode)) {
      return #err("Invalid staff code");
    };
    let now = Time.now();
    // Find or create the staff user entry
    let staffUser : Types.User = switch (AuthLib.findByEmail(users, email)) {
      case (?u) {
        u.role := #staff;
        u
      };
      case null {
        let newUser : Types.User = {
          email;
          var passwordHash = "";
          var role = #staff;
          createdAt = now;
        };
        users.add(newUser);
        newUser
      };
    };
    let token = AuthLib.generateToken(email, now);
    let session : Types.Session = { token; email; role = #staff; createdAt = now };
    sessions.add(token, session);
    #ok({ token; user = AuthLib.toUserInfo(staffUser) });
  };

  // Logout — invalidates session token
  public func logout(token : Types.SessionToken) : async () {
    sessions.remove(token);
  };

  // Get current user info by session token
  public query func getMe(token : Types.SessionToken) : async ?Types.UserInfo {
    switch (AuthLib.findSession(sessions, token)) {
      case null { null };
      case (?session) {
        switch (AuthLib.findByEmail(users, session.email)) {
          case null { null };
          case (?user) { ?AuthLib.toUserInfo(user) };
        };
      };
    };
  };
};
