import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { ArtistModel } from './artists.model';

const createArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const result = await ArtistModel.createArtist(name);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Artist created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getArtists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ArtistModel.getArtists();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Artists retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await ArtistModel.getSingleArtist(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Artist retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await ArtistModel.updateArtist(id, name);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Artist updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await ArtistModel.deleteArtist(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Artist deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const ArtistController = {
  createArtist,
  getArtists,
  getSingleArtist,
  updateArtist,
  deleteArtist,
};
