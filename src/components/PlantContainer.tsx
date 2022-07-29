import Plant from "./Plant";
import { editPlant, PlantObject } from "../stores/plants.store";
import { animateCount } from "../util/animateCount";

interface Props {
  plant: PlantObject;
}

export default function PlantContainer(props: Props) {
  function waterPlant() {
    if (props.plant.water !== 0) return;
    editPlant({ ...props.plant, water: 300 }); // add water
    animateCount(props.plant);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          "justify-content": "center",
          position: "absolute",
          width: "10vw",
          height: "10vw",
          "z-index": 9999999,
        }}
        onClick={waterPlant}
      ></div>
      <Plant plant={props.plant} />
    </>
  );
}
