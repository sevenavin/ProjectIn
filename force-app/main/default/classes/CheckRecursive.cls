/*
    Type : Class
    Class name : CheckRecursive
    Description : This class helps in preventing recursion
*/
public Class CheckRecursive{
    private static boolean runbefore = true;
    public static boolean runOncebefore(){
    if(runbefore){
        runbefore=false;
        return true;
        }else{
            return runbefore;
        }
    }

    private static boolean runAfter = true;
    public static boolean runOnceAfter(){
    if(runAfter){
        runAfter=false;
        return true;
        }else{
            return runAfter;
        }
    }
}