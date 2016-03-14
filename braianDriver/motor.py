class Motor(object):
    def __init__(gpio,pin_set_left, pin_set_right):
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

    def move_forward(self):
        """
        Set pins to move motor and wheel forward
        """
        pass

    def move_backward(self):
        """
        set pins to move motor and whell backward
        """
        pass


class MotorDC(Motor):
    pass

class Stepper(Motor):
    pass
