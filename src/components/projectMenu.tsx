import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import './projectmenu.css';

const getItems = () =>
  Array(7)
    .fill(0)
    .map((_, ind) => ({ id: `SampleProject_${ind}` }));

function ProjectMenu() {
  const [items, setItems] = React.useState(getItems);
  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);

  const isItemSelected = (id:any) => !!selected.find((el) => el === id);

  const handleClick =
    (id:any) =>
    ({ getItemById, scrollToItem }:any) => {
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
    };

  return (
    <div className='menuProject'>
        <h1>
            Your Projects
          </h1>
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {items.map(({ id }) => (
        <Card
          itemId={id} // NOTE: itemId is required for track items
          title={id}
          key={id}
          onClick={handleClick(id)}
          selected={isItemSelected(id)}
          />
          ))}
    </ScrollMenu>
    </div>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <div className='arrowCenter'>
    <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      {'<'}
    </Arrow>
    </div>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <div className='arrowCenter'>

    <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()} >
      {'>'}
    </Arrow>
    </div>
  );
}

function Arrow({ disabled, onClick, children }:any) {
  return (
    <button disabled={disabled} onClick={onClick} className={disabled? 'disabled arrowBtn':'arrowBtn'}>
      {children}
    </button>
  );
}

function Card({ onClick, selected, title, itemId }:any) {
  const visibility = React.useContext(VisibilityContext);

  return (
      <div className="card projectCard" tabIndex={0} onClick={() => onClick(visibility)}>
        <div>{title}</div>
        {/* <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div> */}
        {/* <div>selected: {JSON.stringify(!!selected)}</div> */}
      </div>
  );
}

export default ProjectMenu;