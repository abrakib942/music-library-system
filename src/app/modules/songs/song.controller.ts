import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { SongModel } from './song.model';

const createSong = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, duration, album_id } = req.body;

    const result = await SongModel.createSong(title, duration, album_id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Song created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSongsByAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { album_id } = req.params;

    const result = await SongModel.getSongsByAlbum(album_id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Songs retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSongs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await SongModel.getAllSongs();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Songs retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await SongModel.getSong(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'song retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateSong = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await SongModel.updateSong(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Song updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSong = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await SongModel.deleteSong(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Song deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const SongController = {
  createSong,
  getSongsByAlbum,
  getAllSongs,
  getSingleSong,
  updateSong,
  deleteSong,
};
