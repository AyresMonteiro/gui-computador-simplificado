import { CommandFactory } from '../CommandFactory.js'

import { BackCommandFactory } from './back.js'
import { IfCommandFactory } from './if.js'
import { StopCommandFactory } from './stop.js'

import { CopyCommandFactory } from './copy.js'
import { DivideCommandFactory } from './divide.js'
import { MultiplyCommandFactory } from './multiply.js'
import { PrintCommandFactory } from './print.js'
import { ReadCommandFactory } from './read.js'
import { SubtractCommandFactory } from './subtract.js'
import { SumCommandFactory } from './sum.js'

/**
 * Command factories.
 *
 * @type {(typeof CommandFactory)[]}
 */
export const defaultFactories = [
  // Flow Commands
  StopCommandFactory,
  BackCommandFactory,
  IfCommandFactory,

  // Data Commands
  ReadCommandFactory,
  PrintCommandFactory,
  CopyCommandFactory,
  SumCommandFactory,
  SubtractCommandFactory,
  MultiplyCommandFactory,
  DivideCommandFactory,
]
