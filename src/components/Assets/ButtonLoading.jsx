import { Button } from 'antd'

const ButtonLoading = ({ callback, classes, children, isLoading = false }) => {
  return (
    <Button onClick={callback} className={classes} loading={isLoading}>
      {children}
    </Button>
  )
}

export default ButtonLoading
