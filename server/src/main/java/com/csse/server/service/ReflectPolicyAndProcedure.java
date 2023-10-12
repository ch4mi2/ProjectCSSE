package com.csse.server.service;

public class ReflectPolicyAndProcedure {
    public AddPolicy addPolicyContext;
    public RemovePolicy removePolicyContext;
    public UpdatePolicy updatePolicyContext;

    public ReflectPolicyAndProcedure(AddPolicy addPolicyContext) {
        this.addPolicyContext = addPolicyContext;
    }

    public ReflectPolicyAndProcedure(RemovePolicy removePolicyContext) {
        this.removePolicyContext = removePolicyContext;
    }

    public ReflectPolicyAndProcedure(UpdatePolicy updatePolicyContext) {
        this.updatePolicyContext = updatePolicyContext;
    }
}
