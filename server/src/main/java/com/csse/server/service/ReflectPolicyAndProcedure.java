package com.csse.server.service;

public class ReflectPolicyAndProcedure {
    public AddPolicy addPolicyContext;
    public RemovePolicy removePolicyContext;
    public ReflectPolicyAndProcedure(AddPolicy addPolicyContext) {
        this.addPolicyContext = addPolicyContext;
    }

    public ReflectPolicyAndProcedure(RemovePolicy removePolicyContext) {
        this.removePolicyContext = removePolicyContext;
    }
}
