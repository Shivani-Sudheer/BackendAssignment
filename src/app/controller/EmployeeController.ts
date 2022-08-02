import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateEmployeeDto } from "../dto/createEmployee";
import { UpdateEmployeeParamsDto } from "../dto/paramUpdateEmployee";
import authorize from "../middleware/authorize";

class EmployeeController extends AbstractController {
  [x: string]: any;
  constructor(private empService:EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(`${this.path}`, authorize(['admin', 'engineer']), this.asyncRouteHandler(this.employeeResponse));
    this.router.get(`${this.path}/:id`, this.getEmployeebyID);


    this.router.post(
      `${this.path}`,
      
      validationMiddleware(CreateEmployeeDto,APP_CONSTANTS.body),
      // this.asyncRouteHandler(this.createEmployee)
      this.createEmployee
    );

    this.router.put(
    `${this.path}/:id`,
    validationMiddleware(UpdateEmployeeParamsDto,APP_CONSTANTS.params),
    validationMiddleware(CreateEmployeeDto,APP_CONSTANTS.body),
    
    this.employeeUpdate);


    this.router.delete(`${this.path}/:id`, this.employeeDelete);
      
    this.router.post(
      `${this.path}/login`,
      this.login
    );




  }
  

  private employeeResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.empService.getAllEmployees();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private getEmployeebyID=async(request: RequestWithUser,
    response: Response,
    next: NextFunction)=>
  {
    try {
      const data = await this.empService.getEmployeebyID(request.params.id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.empService.createEmployee(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private employeeUpdate=async(request: RequestWithUser,
    response: Response,
    next: NextFunction)=>
  {
    try {
      const data = await this.empService.employeeUpdate(request.params.id, request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }


  private employeeDelete=async(request: RequestWithUser,
    response: Response,
    next: NextFunction)=>
  {
    try {
      const data = await this.empService.employeeDelete(request.params.id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const loginData = request.body;
    try {
      const loginDetail = await this.empService.employeeLogin(
        loginData.username.toLowerCase(),
        loginData.password
      );
      response.send(
        this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
   

}
}

export default EmployeeController;
