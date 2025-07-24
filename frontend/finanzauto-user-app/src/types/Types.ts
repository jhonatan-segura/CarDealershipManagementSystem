export interface Color {
   id: number,
   name: string
}

export interface Brand {
   id: string,
   name: string
}

export interface ModelLine {
   id: number,
   name: string,
   brandId: string,
   brand: Brand
}

export interface VehicleBodyRequest {
   plate: string,
   colorId: number,
   modelLineId: number,
   yearReleased: number,
   mileage: number,
   cost: number,
   observation: string,
   imageIds: number[],
   statusId: string
}

export interface Observation {
   id: number,
   text: string
}

export interface VehicleStatus {
   id: string,
   name: string
}

export interface Image {
   id: number,
   fileName: string,
   contentType: string,
   imageData: string
}

export interface ImageDataWithId {
   id?: string,
   imageData: string
}

export interface VehicleReceived {
   id: string,
   plate: string,
   color: Color,
   modelLine: ModelLine,
   yearReleased: number,
   mileage: number,
   cost: number,
   observations: Observation[],
   images: Image[],
   status: VehicleStatus
}