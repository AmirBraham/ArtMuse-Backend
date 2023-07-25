import { Store } from "tauri-plugin-store-api";

const store = new Store(".settings.dat");





export const get_state =async () => {
 
  const val = await store.get("interval");
  if(val)
    alert(JSON.stringify(val))
  await store.save();


}

export const set_interval = async (interval:number) => {
  await store.set("interval", { value: interval });
  await store.save();

}

