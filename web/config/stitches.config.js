import { createCss } from '@stitches/react'
import {
  gray,
  blue,
  red,
  green,
  tomato,
  grayDark,
  tomatoDark,
  blueDark,
  redDark,
  greenDark,
} from '@radix-ui/colors'

export const { styled, css, getCssString, theme } = createCss({
  theme: {
    colors: {
      ...gray,
      ...blue,
      ...red,
      ...green,
      ...tomato,
    },
  },
})

export const darkTheme = theme({
  colors: {
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...tomatoDark,
  },
})
