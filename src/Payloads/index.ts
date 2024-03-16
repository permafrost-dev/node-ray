import { PayloadType as BoolPayloadType } from '@/Payloads/BoolPayload';
import { PayloadType as DatePayloadType } from '@/Payloads/DatePayload';
import { PayloadType as ErrorPayloadType } from '@/Payloads/ErrorPayload';
import { PayloadType as EventPayloadType } from '@/Payloads/EventPayload';
import { PayloadType as ExceptionPayloadType } from '@/Payloads/ExceptionPayload';
import { PayloadType as HtmlPayloadType } from '@/Payloads/HtmlPayload';
import { PayloadType as HtmlMarkupPayloadType } from '@/Payloads/HtmlMarkupPayload';
import { PayloadType as ImagePayloadType } from '@/Payloads/ImagePayload';
import { PayloadType as JsonStringPayloadType } from '@/Payloads/JsonStringPayload';
import { PayloadType as LogPayloadType } from '@/Payloads/LogPayload';
import { PayloadType as TablePayloadType } from '@/Payloads/TablePayload';
import { PayloadType as TextPayloadType } from '@/Payloads/TextPayload';
import { PayloadType as XmlPayloadType } from '@/Payloads/XmlPayload';

export type PayloadTypes =
    | BoolPayloadType
    | DatePayloadType
    | ErrorPayloadType
    | EventPayloadType
    | ExceptionPayloadType
    | HtmlPayloadType
    | HtmlMarkupPayloadType
    | ImagePayloadType
    | JsonStringPayloadType
    | LogPayloadType
    | TablePayloadType
    | TextPayloadType
    | XmlPayloadType;
