import Koa from 'koa';

import { uploadFileToS3 } from '../common/common';

import {
  createWomenInvestorCommunity,
  getWomenInvestorCommunity,
  getWomenInvestorCommunityByFilter,
} from '../service/womenInvestorCommunity';

export const uploadWomenInvestorCommunityFile = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const files = (ctx.request as any).files;

  const filePath = files.file.path;
  const fileName = files.file.name;

  const imageUrl = await uploadFileToS3(filePath, fileName);

  ctx.response.status = 201;
  ctx.body = {
    message: 'uploadWomenInvestorCommunityFile',
    imageUrl: imageUrl,
  };
};

export const createWomenInvestorCommunityFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const image = ctx.request.body.image;
  const name = ctx.request.body.name;
  const investorType = ctx.request.body.investorType;
  const areaOfInvestment = ctx.request.body.areaOfInvestment;
  const expertise = ctx.request.body.expertise;
  const location = ctx.request.body.location;
  const connectStatus = ctx.request.body.connectStatus;

  if (image && name && investorType && areaOfInvestment && expertise && location && connectStatus) {
    await createWomenInvestorCommunity(image, name, investorType, areaOfInvestment, expertise, location, connectStatus);

    ctx.response.status = 201;
    ctx.body = {
      message: 'createWomenInvestorCommunity',
    };
  }
};

export const getWomenInvestorCommunityFunc = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const name = ctx.query.name;
  const expertise = ctx.query.expertise;
  const location = ctx.query.location;

  let womenInvestorCommunityList = [];
  if (!name && !expertise && !location) {
    womenInvestorCommunityList = await getWomenInvestorCommunity();
  } else {
    womenInvestorCommunityList = await getWomenInvestorCommunityByFilter(name, expertise, location);
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getWomenInvestorCommunity',
    result: womenInvestorCommunityList,
  };
};
