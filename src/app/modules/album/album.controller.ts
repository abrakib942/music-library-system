import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AlbumModel } from './album.model';

const createAlbum = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, genre, release_year } = req.body;

    const result = await AlbumModel.createAlbum(title, release_year, genre);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'album created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAlbums = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, ['title', 'release_year', 'genre']);
    const options = pick(req.query, ['limit', 'page']);

    const result = await AlbumModel.getAlbums(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'albums retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await AlbumModel.getSingleAlbum(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Album retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateAlbum = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, release_year, genre } = req.body;

    const result = await AlbumModel.updateAlbum(id, title, release_year, genre);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Album updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAlbum = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await AlbumModel.deleteAlbum(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Album deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AlbumController = {
  createAlbum,
  getAlbums,
  getSingleAlbum,
  updateAlbum,
  deleteAlbum,
};
