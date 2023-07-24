from infi.systray import SysTrayIcon
import ctypes
import tkinter as tk
import tkinter.ttk as ttk
from ctypes import windll

import pystray


icon = pystray.Icon(
    'test name',
    icon="icon.ico")



icon.run()

SPI_SETDESKWALLPAPER = 20 
def say_hello(systray):
    print("Hello, World!")
    root=tk.Tk()
    def close_window (): 
        root.destroy()

    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()

    root.overrideredirect(1)
    root.geometry("200x200+{0}+{1}".format(screen_width-210, screen_height-210))
    root.configure(background='gray10')

    btn = tk.Button(text='X', borderwidth=0, highlightthickness=0, bd=0, command=close_window, height="1", width="1")
    btn.pack()
    btn.config(bg='gray10', fg='white') 
    btn.config(font=('helvetica', 8))

    root.mainloop()   
    #ctypes.windll.user32.SystemParametersInfoW(SPI_SETDESKWALLPAPER, 0, "C:/Users/israa/Desktop/ArtMuse/wallpaper.jpg" , 3)

menu_options = (("Say Hello", None, say_hello),)
systray = SysTrayIcon("icon.ico","Art Muse", menu_options)
systray.start()