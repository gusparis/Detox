describe('Genymotion-cloud CLI executable', () => {
  const mockedResult = JSON.stringify({
    result: 'mocked-result',
  });

  let exec;

  beforeEach(() => {
    jest.mock('../../../../utils/exec', () => ({
      execWithRetriesAndLogs: jest.fn().mockResolvedValue({
        stdout: mockedResult,
      }),
    }));
    exec = require('../../../../utils/exec').execWithRetriesAndLogs;
  });

  describe('Get-recipe command', () => {
    const recipeName = 'mock-recipe-name';

    it('should execute command by name', async () => {
      const { GetRecipeCommand, GenyCloudCliExec } = require('./GenyCloudCliExec');
      const uut = new GenyCloudCliExec();
      const command = new GetRecipeCommand(recipeName);
      await uut.exec(command);
      expect(exec).toHaveBeenCalledWith(`"gmsaas" --format json recipes list --name "${recipeName}"`);
    });

    it('should return result', async () => {
      const { GetRecipeCommand, GenyCloudCliExec } = require('./GenyCloudCliExec');

      const uut = new GenyCloudCliExec();
      const command = new GetRecipeCommand(recipeName);
      const result = await uut.exec(command);
      expect(result).toEqual(mockedResult);
    });
  });
});
