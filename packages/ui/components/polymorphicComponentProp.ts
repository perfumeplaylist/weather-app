import { type ComponentPropsWithoutRef, type ElementType } from "react";

/**
 * Polymorphic Component Props
 * 각 HTML 요소의 고유 속성까지 타입 안전하게 지원
 */
type PolymorphicRef<C extends ElementType> = ComponentPropsWithoutRef<C>["ref"];

type AsProp<C extends ElementType> = {
  as?: C;
};

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProp<
  C extends ElementType,
  Props = object
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicComponentPropWithRef<
  C extends ElementType,
  Props = object
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };
