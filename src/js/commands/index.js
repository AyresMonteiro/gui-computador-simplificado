import { CommandFactory } from '../CommandFactory.js'

import { BackCommandFactory } from './back.js'
import { CopyCommandFactory } from './copy.js'
import { DivideCommandFactory } from './divide.js'
import { IfCommandFactory } from './if.js'
import { MultiplyCommandFactory } from './multiply.js'
import { PrintCommandFactory } from './print.js'
import { ReadCommandFactory } from './read.js'
import { StopCommandFactory } from './stop.js'
import { SubtractCommandFactory } from './subtract.js'
import { SumCommandFactory } from './sum.js'

/**
 * Command factories.
 *
 * @type {(typeof CommandFactory)[]}
 */
export const defaultFactories = [
  BackCommandFactory,
  CopyCommandFactory,
  DivideCommandFactory,
  IfCommandFactory,
  MultiplyCommandFactory,
  PrintCommandFactory,
  ReadCommandFactory,
  StopCommandFactory,
  SubtractCommandFactory,
  SumCommandFactory,
]
