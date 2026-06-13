import './Loader.scss';

export const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__spinner"></div>
      <span className="loader__text">Загрузка</span>
    </div>
  );
};


