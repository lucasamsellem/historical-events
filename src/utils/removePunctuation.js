const removePunctuation = (string) => {
  return string
    .split(' ')
    .map((word) => word.replace(/[,:;.!]/g, ''))
    .join(' ');
};

export default removePunctuation;
