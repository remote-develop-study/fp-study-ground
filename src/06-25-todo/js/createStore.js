export default function() {
  localStorage.setItem('autoIncrementedId', localStorage.getItem('autoIncrementedId') || 0);
  return {
    generateId() {
      const id = Number(localStorage.getItem('autoIncrementedId'));
      localStorage.setItem('autoIncrementedId', id + 1);
      return id;
    }
  };
};