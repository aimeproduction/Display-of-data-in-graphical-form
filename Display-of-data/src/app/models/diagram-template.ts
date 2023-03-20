export interface DiagramTemplate {
  id: number
  title: string
  diagramType: string
  queryPath: string
  selectedLinesValue:[
    {
      lineName: string,
      lineColor: string
}
]
}
