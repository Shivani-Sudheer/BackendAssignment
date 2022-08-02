import HttpException from "./HttpException";
import { CustomError } from "../util/rest/errorCode";


class IncorrectUsernameOrPasswordException extends HttpException {

    constructor(error: CustomError) {
      super(400, error.MESSAGE, error.CODE);
    }
  }
  
  export default IncorrectUsernameOrPasswordException;
  