import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse/index';
import { ExampleConfig } from 'app/main/example/ExampleConfig';
import { SearchConfig } from 'app/main/search/SearchConfig';
import { LoginConfig } from 'app/main/auth/login/LoginConfig';
import { ForgotPasswordPageConfig } from 'app/main/auth/forgot-password/ForgotPasswordPageConfig';

import ChartConfig from './../main/chart/ChartConfig';

import { AnalyticsDashboardAppConfig } from './../main/dashboard/analytics/AnalyticsDashboardAppConfig';
import { PatientConfig } from './../main/patient/PatientConfig';
import { CalendarAppConfig } from './../main/calendar/CalendarAppConfig';
import { SettingsConfig } from './../main/settings/SettingsConfig';
import { logoutAppConfig } from './../main/logout/logoutAppConfig';
import {LockPageConfig} from './../main/auth/lock/LockPageConfig'
const routeConfigs = [
  ExampleConfig,
  LoginConfig,
  ForgotPasswordPageConfig,
  ChartConfig,
  AnalyticsDashboardAppConfig,
  PatientConfig,
  SettingsConfig,
  SearchConfig,
  CalendarAppConfig,
  logoutAppConfig,
  LockPageConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/dashboard" />
  }
];

export default routes;
