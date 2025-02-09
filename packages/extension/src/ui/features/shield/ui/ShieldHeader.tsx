import { H4, P3, icons } from "@argent/ui"
import { Center, ChakraComponent, Circle, Spinner } from "@chakra-ui/react"
import { FC, ReactNode } from "react"

const { ArgentShieldIcon } = icons

const variants = {
  default: {
    bg: "neutrals.700",
    fg: "white",
  },
  primary: {
    bg: "primary.500",
    fg: "neutrals.900",
  },
  removed: {
    bg: "error.900",
    fg: "error.400",
  },
  success: {
    bg: "success.900",
    fg: "success.500",
  },
  warning: {
    bg: "warning.500",
    fg: "neutrals.900",
  },
  danger: {
    bg: "error.900",
    fg: "error.400",
  },
}

type Variant = keyof typeof variants

interface ShieldHeaderProps {
  title: ReactNode
  subtitle?: ReactNode
  variant?: Variant
  size?: "md" | "lg"
  icon?: ChakraComponent<"svg">
  isLoading?: boolean
}

export const ShieldHeader: FC<ShieldHeaderProps> = ({
  title,
  subtitle,
  variant: variantKey = "default",
  size = "md",
  icon: Icon = ArgentShieldIcon,
  isLoading,
}) => {
  const variant = variants[variantKey]
  return (
    <Center flexDirection={"column"} textAlign={"center"} pt={4} pb={8} px={4}>
      <Circle
        size={size === "md" ? 18 : 24}
        bg={isLoading ? "black" : variant.bg}
      >
        {isLoading ? (
          <Spinner size={"xl"} />
        ) : (
          <Icon fontSize={size === "md" ? "4xl" : "5xl"} color={variant.fg} />
        )}
      </Circle>
      <H4 pt={4}>{title}</H4>
      {subtitle && (
        <P3 pt={2} color={"neutrals.100"}>
          {subtitle}
        </P3>
      )}
    </Center>
  )
}
