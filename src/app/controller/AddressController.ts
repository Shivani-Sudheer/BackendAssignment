import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { AddressService } from "../service/AddressService";


class AddressController extends AbstractController {
  [x: string]: any;
  constructor(private addService: AddressService) {
    super(`${APP_CONSTANTS.apiPrefix}/address`);
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.asyncRouteHandler(this.addressResponse));
    this.router.get(`${this.path}/:id`, this.getAddressbyID);
    this.router.post(
      `${this.path}`,
      this.createAddress
    );

    this.router.put(
      `${this.path}/:id`,
      this.addressUpdate);
    this.router.delete(`${this.path}/:id`, this.addressDelete);
  }


  private addressResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.empService.getAllAddress();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private getAddressbyID = async (request: RequestWithUser,
    response: Response,
    next: NextFunction) => {
    try {
      const data = await this.addService.getAddressbyID(request.params.id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private createAddress = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.addService.createAddress(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private addressUpdate = async (request: RequestWithUser,
    response: Response,
    next: NextFunction) => {
    try {
      const data = await this.addService.addressUpdate(request.params.id, request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }


  private addressDelete = async (request: RequestWithUser,
    response: Response,
    next: NextFunction) => {
    try {
      const data = await this.addService.addressDelete(request.params.id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }
}

export default AddressController;
