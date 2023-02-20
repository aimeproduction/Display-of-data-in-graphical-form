export interface Response {
  columnConfigs: [
    {
      id: 'BLANK_HEADER',
      header: string,
      template: string,
      pacsColumn: boolean,
      sort: 'string',
      adjust: boolean
    },
  ],
  resultData: [
    {
      id: number,
      BLANK_HEADER: {
        value: string,
        pacsEntry: boolean
      }
    }
  ]
  numHits: number,
  timeTookInMS: number,
  containsPACSColumn: boolean
}
