class Motor(object):
    def __init__(self,gpio,pin_set_left, pin_set_right):
        """
        Motor constructor
        Args:
            pin_set_left: tuple to represent pins to control left wheel
            pin_set_right: idem the later to control right wheel
        Returns:
            Proper Motor Object
        """
        self.gpio = gpio
        self.pin_set_left = pin_set_left
        self.pin_set_right = pin_set_right

    def move_forward(self, units):
        """
        Set pins to move motor and wheel forward
        Args:
            units: magnitude used to perform de movement
        Returns:
            Units moved.
        """
        pass

    def move_backward(self, units):
        """
        Set pins to move motor and wheel forward
        Args:
            units: magnitude used to perform de movement
        Returns:
            Units moved.
        """
        pass


class MotorDC(Motor):
    def __init__(self,gpio,pin_set_left, pin_set_right):
        super().__init__(gpio,pin_set_left, pin_set_right)

    def move_forward(self, units):




class Stepper(Motor):
    def __init__(self,gpio,pin_set_left, pin_set_right):
        super().__init__(gpio,pin_set_left, pin_set_right)
