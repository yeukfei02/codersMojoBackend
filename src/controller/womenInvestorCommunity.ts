import * as Koa from 'koa';

import * as womenInvestorCommunityService from '../service/womenInvestorCommunity';

export const createWomenInvestorCommunity = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const name = ctx.request.body.name;
  const investorType = ctx.request.body.investorType;
  const areaOfInvestment = ctx.request.body.areaOfInvestment;
  const expertise = ctx.request.body.expertise;
  const location = ctx.request.body.location;
  const connectStatus = ctx.request.body.connectStatus;

  if (name && investorType && areaOfInvestment && expertise && location && connectStatus) {
    await womenInvestorCommunityService.createWomenInvestorCommunity(
      name,
      investorType,
      areaOfInvestment,
      expertise,
      location,
      connectStatus,
    );

    ctx.response.status = 201;
    ctx.body = {
      message: 'createWomenInvestorCommunity',
    };
  }
};

export const getWomenInvestorCommunity = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const expertise = ctx.query.expertise;
  const location = ctx.query.location;

  let womenInvestorCommunityList = [];
  if (!expertise && !location) {
    womenInvestorCommunityList = await womenInvestorCommunityService.getWomenInvestorCommunity();
  } else {
    womenInvestorCommunityList = await womenInvestorCommunityService.getWomenInvestorCommunityByFilter(
      expertise,
      location,
    );
  }

  ctx.response.status = 200;
  ctx.body = {
    message: 'getWomenInvestorCommunity',
    result: womenInvestorCommunityList,
  };
};
