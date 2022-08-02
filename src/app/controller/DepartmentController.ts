import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateDepartmentDto } from "../dto/createDepartment";

class DepartmentController extends AbstractController {
  [x: string]: any;
  constructor(private deptService:DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.departmentResponse);


    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateDepartmentDto,APP_CONSTANTS.body),
      this.createDepartment
    );
    this.router.put(`${this.path}/:id`, this.departmentUpdate);
    this.router.delete(`${this.path}/:id`, this.departmentDelete);
      



  }
  

  private departmentResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.deptService.getAllDepartments();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }
  private createDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.deptService.createDepartment(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private departmentUpdate=async(request: RequestWithUser,
    response: Response,
    next: NextFunction)=>
  {
    try {
      const data = await this.deptService.departmentUpdate(request.params.id, request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }


  private departmentDelete=async(request: RequestWithUser,
    response: Response,
    next: NextFunction)=>
  {
    try {
      const data = await this.deptService.departmentDelete(request.params.id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }


}

export default DepartmentController;
