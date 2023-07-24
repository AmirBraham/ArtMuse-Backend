import PySimpleGUI as sg
from psgtray import SystemTray

def move_to_right_bottom_corner(window):
    screen_width, screen_height = window.get_screen_dimensions()
    win_width, win_height = window.size
    PADDING = 50
    x, y = (screen_width - win_width) , screen_height - win_height - PADDING
    window.move(x, y)
def main():

    menu = ['', ['Show Window', 'Hide Window', 'Exit']]
    tooltip = 'Tooltip'

    layout = [[sg.Text('Art Muse')],
    [sg.Text('a')],

             
              [sg.Button('Next'), sg.B('Previous'), sg.B('Add to Favorites')]]

    window = sg.Window('Window Title', layout, finalize=True, enable_close_attempted_event=True,no_titlebar=True)
    window.bring_to_front()

    move_to_right_bottom_corner(window)

    tray = SystemTray(menu, single_click_events=True, window=window, tooltip=tooltip, icon="icon.ico")
    tray.show_message('System Tray', 'System Tray Icon Started!')
    while True:
        event, values = window.read()
        # IMPORTANT step. It's not required, but convenient. Set event to value from tray
        # if it's a tray event, change the event variable to be whatever the tray sent
        if event == tray.key:
            sg.cprint(f'System Tray Event = ', values[event], c='white on red')
            event = values[event]       # use the System Tray's event as if was from the window

        if event in (sg.WIN_CLOSED, 'Exit'):
            break

        tray.show_message(title=event, message=values)
        if event in ('Show Window', sg.EVENT_SYSTEM_TRAY_ICON_DOUBLE_CLICKED):
            window.un_hide()
            window.bring_to_front()
            move_to_right_bottom_corner(window)
        elif event in ('Hide Window', sg.WIN_CLOSE_ATTEMPTED_EVENT):
            window.hide()
            tray.show_icon()        # if hiding window, better make sure the icon is visible
            # tray.notify('System Tray Item Chosen', f'You chose {event}')


    tray.close()            # optional but without a close, the icon may "linger" until moused over
    window.close()

if __name__ == '__main__':
    main()