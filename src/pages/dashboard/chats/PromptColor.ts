export const getPromptColor = (index: number): string => {
  const colors = [
      'bg-primary-100', 'bg-secondary-100', 'bg-neutral-300',
      'bg-[#5C88DA60]', 'bg-[#CAFFD640]', 'bg-[#96962240]',
      'bg-[#FFC097]', 'bg-secondary-100', 'bg-neutral-300', 'bg-[#5C88DA80]'
  ];
  return colors[index % colors.length] || 'bg-primary-100';
};