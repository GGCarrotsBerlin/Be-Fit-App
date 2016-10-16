import numpy as np

NW = (52.58363, 13.2035)
SE = (52.42755, 13.62648)
NE = (NW[0], SE[1])
SW = (SE[0], NW[1])


def flatten_list(irregularly_nested_list):
    """Generator which recursively flattens list of lists
    :param irregularly_nested_list: iterable object containing iterable and non-iterable objects as elements
    """
    for el in irregularly_nested_list:
        if isinstance(el, list):
            for sub_el in flatten_list(el):
                yield sub_el
        else:
            yield el


def create_grid_of_berlin(cnt_x=60, cnt_y=40):
    x = np.linspace(NW[0], SE[0], cnt_x)
    y = np.linspace(NW[1], SE[1], cnt_y)
    return x, y
