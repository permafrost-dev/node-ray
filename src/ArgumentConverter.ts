export class ArgumentConverter {
    public static convertToPrimitive(arg: any): any {
        if (arg === null) {
            return null;
        }

        if (typeof arg === 'string') {
            return arg;
        }

        if (typeof arg === 'number') {
            return arg;
        }

        if (typeof arg === 'boolean') {
            return arg;
        }

        //cloner = new VarCloner();
        //dumper = new HtmlDumper();
        //clonedArgument = cloner.cloneVar(argument);
        //return dumper.dump(clonedArgument, true);

        return JSON.stringify(arg, null, 4);
    }
}
