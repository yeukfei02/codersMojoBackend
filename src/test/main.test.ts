describe('main.test', () => {
  describe('test', () => {
    test('result test', async () => {
      try {
        const result = 1 + 1;
        expect(result).toBe(2);
      } catch (e) {
        console.log(`error = ${e.message}`);
      }
    });
  });
});
