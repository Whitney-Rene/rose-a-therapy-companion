import { rest } from "msw";

//defines an endpoint
//ISSUE : can't read post for some reason???
export const loginHandler = rest.post(
  "http://localhost:9999/login",
  (req, res, ctx) => {
    //sends/simulates a successful login
    return res(
      ctx.status(200),
      ctx.json({
        message: "Authentication successful",
        user_id: 1,
        user_name: "Test User",
      })
    );
  }
);
