from filestack import Client

client = Client("ArIYtrkpuSEoHPA9PnBvvz")

store_params = {
    'location': 's3', 
    'path': 'releases/1.0.0/',
}
filelink = client.upload(filepath=r"""C:\Users\israa\Desktop\ArtMuse\artmuseapp\src-tauri\target\release\bundle\msi\artmuse_0.1.0_x64_en-US.msi""", store_params=store_params)


