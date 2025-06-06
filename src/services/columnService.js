/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }
    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (getNewColumn) {
      // Xử lí cấu trúc data ở đây trước khi trả dữ liệu về
      getNewColumn.cards = []

      // Cập nhật mảng columnOrderIds trong collection boards
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) { throw error }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updateData)
    return updatedColumn
  } catch (error) { throw error }
}

const deleteItem = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)
    console.log('🚀 ~ deleteItem ~ targetColumn:', targetColumn)

    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found!')
    }
    // Xoá column
    await columnModel.deleteOneById(columnId)

    // Xoá tất cả cards trong column này
    await cardModel.deleteManyByColumnId(columnId)

    //  Xóa columnId khỏi mảng columnOrderIds của board chứa nó
    await boardModel.pullColumnOrderIds(targetColumn)

    return { deleteResult: 'Column and its Cards deleted successfully!' }
  } catch (error) { throw error }
}

export const columnService = {
  createNew,
  update,
  deleteItem
}