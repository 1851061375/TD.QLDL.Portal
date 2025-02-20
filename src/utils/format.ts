
export const getCurrency = (value: string | number) => {
    return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0
  }


export const splitNumber = (numStr: string) => {
  if (!numStr) return '';
  let groups = [];
  
  for (let i = numStr.length; i > 0; i -= 3) {
      let start = i - 3 >= 0 ? i - 3 : 0;
      groups.unshift(numStr.slice(start, i));
  }

  return groups.join(' ');
}


export const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}