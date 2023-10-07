interface RectangleCardTitleProps {
  title: string
}

export function RectangleCardTitle({ title }: RectangleCardTitleProps) {
  return (
    <h3>{title}</h3>
  )
}