import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { cognitoConfig } from "../cognitoConfig";

const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.UserPoolId,
  ClientId: cognitoConfig.ClientId,
});

export function signUp(username, email, password) {
  return new Promise((resolve, reject) => {
    userPool.signUp(
      username,
      password,
      [{ Name: "email", Value: email }],
      null,
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result.user);
      }
    );
  });
}

export function confirmSignUp(username, code) {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

export function signIn(username, password) {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const accessToken = result.getAccessToken().getJwtToken();
        localStorage.setItem('accessToken', accessToken);
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
}

export function forgotPassword(username) {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    })

    cognitoUser.forgotPassword({
      onSuccess: () => {
        resolve()
      },
      onFailure: (err) => {
        reject(err)
      },
    })
  })
}

export function confirmPassword(username, confirmationCode, newPassword) {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    })

    cognitoUser.confirmPassword(confirmationCode, newPassword, {
      onSuccess: () => {
        resolve()
      },
      onFailure: (err) => {
        reject(err)
      },
    })
  })
}

export async function signOut() {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
    localStorage.removeItem("accessToken");
  }
}

export async function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) {
      reject(new Error("No user found"));
      return;
    }

    cognitoUser.getSession((err, session) => {
      if (err) {
        reject(err);
        return;
      }
      console.log("session", session);

      const accessToken = session.accessToken
      console.log("accessToken", accessToken);
      cognitoUser.getUserAttributes((err, attributes) => {
        if (err) {
          reject(err);
          return;
        }
        const userData = attributes.reduce((acc, attribute) => {
          acc[attribute.Name] = attribute.Value;
          return acc;
        }, {});
        console.log(attributes);
        resolve({ ...userData, username: cognitoUser.username });
      });
    });
  });
}

export function getSession() {
  const cognitoUser = userPool.getCurrentUser();
  return new Promise((resolve, reject) => {
    if (!cognitoUser) {
      reject(new Error("No user found"));
      return;
    }
    cognitoUser.getSession((err, session) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(session);
    });
  });
}

export function changePassword(username, oldPassword, newPassword) {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool, 
    });

    cognitoUser.getSession((err, session) => {
      if (err) {
        reject(err);
        return;
      }

      cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
}


const attributes = (key, value) => {
  return {
    Name : key,
    Value : value
  }
};

export function updateUser(username, address, email, phoneNumber, gender, name, birthdate) {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool, 
    });

    let attributeList = []
    attributeList.push(attributes('email',email));
    attributeList.push(attributes('phone_number',phoneNumber));
    attributeList.push(attributes('name',name));
    attributeList.push(attributes('address',address));
    attributeList.push(attributes('gender',gender));
    attributeList.push(attributes('birthdate',birthdate));

    cognitoUser.getSession((err, session) => {
      if (err) {
        reject(err);
        return;
      }

      cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
}

export function resendCode(username) {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}